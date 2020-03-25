require(['dojo/router', 'dojo/hash', 'dojo/on', 'dojo/dom', 'rci/stateService', 'rci/actionService', 'rci/onLoadService'],
    (router, hash, on, dom, stateService, actionService, onLoadService) => {
      // Fire OnLoad Handler
      onLoadService.trigger();

      // Attach State handlers
      on(dom.byId("rci-router-trigger-1"), "click", () => {
        router.go("/rci/router/trigger/1");
      });
      on(dom.byId("rci-router-trigger-2"), "click", () => {
        router.go("/rci/router/trigger/2");
      });
      on(dom.byId("rci-router-trigger-checkout"), "click", () => {
        router.go("/rci/router/trigger/checkout");
      });
      stateService.register();
      router.startup();

      // Attach Action handlers
      actionService.register();
    });