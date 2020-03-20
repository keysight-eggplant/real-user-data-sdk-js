require(['dojo/router', 'dojo/on', 'dojo/dom', 'rci/producerFactory', 'rci/routerService'],
    (router, on, dom, producerFactory, routerService) => {

      // Attach Router handlers
      on(dom.byId("rci-router-trigger-1"), "click", () => {
        router.go("/rci/router/trigger/1");
      });
      on(dom.byId("rci-router-trigger-2"), "click", () => {
        router.go("/rci/router/trigger/2");
      });
      on(dom.byId("rci-router-trigger-checkout"), "click", () => {
        router.go("/rci/router/trigger/checkout");
      });
      routerService.register();

      router.startup();
    });