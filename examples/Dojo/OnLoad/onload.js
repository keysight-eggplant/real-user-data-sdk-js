function rciSdkProducerFactory(customCollectors) {
  var tenancyId = '123';
  var targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  var transport = new rciSdk.Transport(targetUrl);
  var defaults = rciSdk.collector.defaultCollectors;
  var collection = defaults.concat(customCollectors);
  return new rciSdk.Producer(transport, collection);
}

require(["dojo/router", "dojo/dom", "dojo/on"],
    function (router, dom, on) {
      router.register("/foo/bar/1", function (evt) {
        evt.preventDefault();

        var customCollector = {
          prepare: function (event) {
            event.eventStart = new Date().getTime();
            event.eventEnd = new Date().getTime();
            event.eventAction = 'dojo_router';
            event.eventCategory = evt.newPath;
            return event;
          }
        };

        // Step 4: Call your factory
        rciSdkProducerFactory([customCollector]).collect();
      });

      router.register("/foo/bar/2", function (evt) {
        evt.preventDefault();

        var customCollector = {
          prepare: function (event) {
            event.eventStart = new Date().getTime();
            event.eventEnd = new Date().getTime();
            event.eventAction = 'dojo_router';
            event.eventCategory = evt.newPath;
            return event;
          }
        };

        // Step 4: Call your factory
        rciSdkProducerFactory([customCollector]).collect();
      });

      router.startup();

      on(dom.byId("changeHash1"), "click", function () {
        router.go("/foo/bar/1");
      });

      on(dom.byId("changeHash2"), "click", function () {
        router.go("/foo/bar/2");
      });
    });