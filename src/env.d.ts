/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;

type ENV = {
  kv: KVNamespace;
  secret: string;
};

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<ENV>;

declare namespace App {
  interface Locals extends Runtime {
    user?: {
      token: string;
    };
  }
}