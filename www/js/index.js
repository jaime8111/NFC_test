var app = {
    log: function (msg) {
        document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<li>' + msg + '</li>';
    },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.log('Deviceready');

        // Be ready to read NDEF formatted NFC Tags
        nfc.addNdefListener (
            function (nfcEvent) {
                var tag = nfcEvent.tag,
                    ndefMessage = tag.ndefMessage;

                app.log('>> FULL MESSAGE:');
                app.log(JSON.stringify(ndefMessage));

                var payload = nfc.bytesToString(ndefMessage[0].payload);

                app.log('>> USER DATA:');
                app.log(payload);

                payload = JSON.parse(payload);
                app.log(payload.user);
            },
            function () { // success callback
                //alert("Waiting for NDEF tag");
            },
            function (error) { // error callback
                //alert("Error adding NDEF listener " + JSON.stringify(error));
            }
        );
    }
};
