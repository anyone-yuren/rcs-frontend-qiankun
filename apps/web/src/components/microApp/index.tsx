import { FrameworkConfiguration, initGlobalState, loadMicroApp } from "qiankun";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
const microAppEntryCache: any = {};
const actions = initGlobalState({ hash: "" });

function run(fn: any, ...params: any[]) {
  if (typeof fn === "function") {
    return fn(...params);
  }

  return undefined;
}

interface MicroAppProps extends FrameworkConfiguration {
  name: string;
  entry?: string;
  props?: any;
  [key: string]: any;
}

let prevAppUnmountPromise: Promise<any> = Promise.resolve();

// https://qiankun.umijs.org/zh/api#loadmicroappapp-configuration
const MicroApp = ({
  name,
  entry,
  sandbox = true,
  props = {},
}: MicroAppProps) => {
  const location = useLocation();
  const [, setReady] = useState(false);
  const microApp = useRef<any>();
  const container = useRef<any>();

  // const { account } = useAccount()
  // const { locale } = useAppConfig()

  useEffect(() => {
    // debugger
    async function mount() {
      // debugger
      await prevAppUnmountPromise;
      // debugger
      window[name as any] = microAppEntryCache[name] ?? window[name as any];

      microApp.current = loadMicroApp(
        {
          name,
          entry: entry!,
          container: container.current,
          props,
        },
        {
          sandbox,
        }
      );

      microApp.current.mountPromise.then(() => {
        if (window[name as any]) {
          microAppEntryCache[name] = window[name as any];
        }

        setReady(true);
      });
    }
    mount();

    return () => {
      // debugger
      prevAppUnmountPromise = Promise.resolve(
        run(microApp.current?.unmount)
      ).then(() => {
        // debugger
      });
    };
  }, []);

  useEffect(() => {
    if (!microApp.current) {
      return;
    }
    run(microApp.current?.update, {
      container: container.current,
      props: {
        ...props,
        location,
      },
    });
    console.log(container.current);
  }, [location, Object.values(props)]);

  useEffect(() => {
    actions.setGlobalState(location);
  }, [location]);

  return (
    <>
      <div className="micro-wrapper" ref={container} />
    </>
  );
};

export default function MicroAppWrapper(props: MicroAppProps) {
  return <MicroApp key={props.name} entry={`/${props.name}/`} {...props} />;
}
