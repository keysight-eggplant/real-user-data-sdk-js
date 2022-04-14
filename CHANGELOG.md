## 2022-04-07, Version 17.9.0 (Current), @BethGriggs prepared by @juanarbol

### Notable Changes

* Ability to bootstrap the producer, transport in a declarative like syntax.
* Ability for the SDK Core to accept a list of tenancies each with their own configuration.
  * Ability to configure multiple valid tenancies differently
  * Ability to send the collected beacon to multiple valid targets at the same time
* Added End to End Coverage for all the Core SDK Vanilla examples.
* Enhanced the documentation on how to configure the Transport in the new multi tenancy mode and how to provision it in the legacy, single targetURL mode.
* Refactored WebPack to have the ability to be called from CLI and to be able to be used from the Node.js runtime to facilitate tests, mocking, and continuous development.


