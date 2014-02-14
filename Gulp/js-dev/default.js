
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // Load

            } else {
                // Reload
            }
            args.setPromise(WinJS.UI.processAll());
        }

    };

    app.oncheckpoint = function (args) {
        // Suspend
    };

    app.start();
})();