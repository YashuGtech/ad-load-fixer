# Ad Load Fixer

Don't spoil anything just do whatever said don't spoil back-end database connection just fix the loading of Reward interstail ads loading problem ad sdk 



// Rewarded interstitial



show_11537060().then(() => {

    // You need to add your user reward function here, which will be executed after the user watches the ad.

    // For more details, please refer to the detailed instructions.

    alert('You have seen an ad!');

})

Ex code <!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"

          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">



    <title>Monetag Ad Tester</title>



    <!-- Telegram Mini App SDK -->

    <script src="https://telegram.org/js/telegram-web-app.js"></script>



    <!-- Monetag SDK -->

    <script

        src="//libtl.com/sdk.js"

        data-zone="11537060"

        data-sdk="show_11537060">

    </script>



    <style>

        * {

            box-sizing: border-box;

        }



        body {

            margin: 0;

            padding: 20px;

            font-family: Arial, sans-serif;

            background: #0b0b0f;

            color: white;

        }



        .container {

            max-width: 500px;

            margin: auto;

        }



        h1 {

            text-align: center;

            margin-bottom: 8px;

        }



        .subtitle {

            text-align: center;

            color: #999;

            margin-bottom: 25px;

        }



        .card {

            background: #15151c;

            border: 1px solid #292934;

            border-radius: 18px;

            padding: 18px;

            margin-bottom: 15px;

        }



        .card h2 {

            margin-top: 0;

            font-size: 19px;

        }



        .card p {

            color: #aaa;

            font-size: 14px;

            line-height: 1.5;

        }



        button {

            width: 100%;

            border: none;

            border-radius: 13px;

            padding: 15px;

            font-size: 16px;

            font-weight: bold;

            color: white;

            background: #5865f2;

            cursor: pointer;

        }



        button:active {

            transform: scale(0.98);

        }



        button:disabled {

            opacity: 0.5;

        }



        .reward {

            background: #16a34a;

        }



        .popup {

            background: #f59e0b;

            color: #111;

        }



        .inapp {

            background: #8b5cf6;

        }



        #status {

            background: #111116;

            border: 1px solid #292934;

            border-radius: 15px;

            padding: 15px;

            margin-top: 20px;

            white-space: pre-wrap;

            word-break: break-word;

            font-size: 13px;

            color: #bdbdbd;

        }



        .sdk-status {

            text-align: center;

            margin: 15px 0;

            padding: 10px;

            border-radius: 10px;

            background: #17171e;

        }



        .green {

            color: #4ade80;

        }



        .red {

            color: #f87171;

        }

    </style>

</head>



<body>



<div class="container">



    <h1>Monetag Ad Tester</h1>



    <div class="subtitle">

        Telegram Mini App • Zone 11537060

    </div>



    <div class="sdk-status" id="sdkStatus">

        Checking Monetag SDK...

    </div>



    <!-- Rewarded Interstitial -->

    <div class="card">

        <h2>🎁 Rewarded Interstitial</h2>



        <p>

            Full-screen rewarded advertisement.

            Reward the user only after the SDK confirms completion.

        </p>



        <button class="reward" id="rewardedBtn">

            ▶ Watch Rewarded Ad

        </button>

    </div>



    <!-- Rewarded Popup -->

    <div class="card">

        <h2>🌐 Rewarded Popup</h2>



        <p>

            Opens the advertiser page. This must be triggered

            directly by the user's tap.

        </p>



        <button class="popup" id="popupBtn">

            🎁 Open Rewarded Popup

        </button>

    </div>



    <!-- In-App Interstitial -->

    <div class="card">

        <h2>📺 In-App Interstitial</h2>



        <p>

            Standard full-screen interstitial. No reward is given.

        </p>



        <button class="inapp" id="inappBtn">

            📺 Show In-App Interstitial

        </button>

    </div>



    <div id="status">

        Status: Waiting...

    </div>



</div>



<script>



    const statusBox = document.getElementById("status");

    const sdkStatus = document.getElementById("sdkStatus");



    function log(message) {

        const time = new Date().toLocaleTimeString();



        statusBox.textContent =

            `[${time}] ${message}\n\n` +

            statusBox.textContent;

    }



    // Telegram initialization

    if (window.Telegram && Telegram.WebApp) {

        Telegram.WebApp.ready();

        Telegram.WebApp.expand();



        log("Telegram WebApp initialized.");

    } else {

        log("Telegram WebApp SDK not detected.");

    }





    // Check Monetag SDK

    setTimeout(() => {



        if (typeof window.show_11537060 === "function") {



            sdkStatus.innerHTML =

                '<span class="green">✓ Monetag SDK loaded</span>';



            log("Monetag SDK loaded successfully.");



        } else {



            sdkStatus.innerHTML =

                '<span class="red">✗ Monetag SDK NOT loaded</span>';



            log(

                "ERROR: show_11537060 is undefined.\n" +

                "Check the Monetag SDK script and zone ID."

            );



        }



    }, 1500);





    /*

    ==========================================

    1. REWARDED INTERSTITIAL

    ==========================================

    */



    document.getElementById("rewardedBtn").addEventListener("click", async () => {



        if (typeof window.show_11537060 !== "function") {

            log("ERROR: Monetag SDK is not loaded.");

            return;

        }



        const button = document.getElementById("rewardedBtn");



        button.disabled = true;

        button.textContent = "Loading Ad...";



        const ymid =

            "rewarded_" +

            Date.now();



        log("Requesting Rewarded Interstitial...");



        try {



            const result = await show_11537060({

                ymid: ymid,

                requestVar: "rewarded_button"

            });



            console.log("Rewarded result:", result);



            log(

                "Rewarded Interstitial completed.\n" +

                JSON.stringify(result, null, 2)

            );



            /*

             IMPORTANT:

             Put your reward logic here.



             Example:



             addCoins(100);



             For important rewards,

             use Monetag postbacks/backend

             instead of trusting frontend only.

            */



            alert("Ad completed! Reward can be given.");



        } catch (error) {



            console.error("Rewarded error:", error);



            log(

                "Rewarded Interstitial failed:\n" +

                (error?.message || error)

            );



        } finally {



            button.disabled = false;

            button.textContent = "▶ Watch Rewarded Ad";



        }



    });





    /*

    ==========================================

    2. REWARDED POPUP

    ==========================================

    */



    document.getElementById("popupBtn").addEventListener("click", async () => {



        if (typeof window.show_11537060 !== "function") {

            log("ERROR: Monetag SDK is not loaded.");

            return;

        }



        const button = document.getElementById("popupBtn");



        button.disabled = true;

        button.textContent = "Opening...";



        const ymid =

            "popup_" +

            Date.now();



        log("Opening Rewarded Popup...");



        try {



            const result = await show_11537060({

                type: "pop",

                ymid: ymid,

                requestVar: "popup_button"

            });



            console.log("Popup result:", result);



            log(

                "Rewarded Popup triggered.\n" +

                JSON.stringify(result, null, 2)

            );



        } catch (error) {



            console.error("Popup error:", error);



            log(

                "Rewarded Popup failed:\n" +

                (error?.message || error)

            );



        } finally {



            button.disabled = false;

            button.textContent = "🎁 Open Rewarded Popup";



        }



    });





    /*

    ==========================================

    3. IN-APP INTERSTITIAL

    ==========================================

    */



    document.getElementById("inappBtn").addEventListener("click", async () => {



        if (typeof window.show_11537060 !== "function") {

            log("ERROR: Monetag SDK is not loaded.");

            return;

        }



        const button = document.getElementById("inappBtn");



        button.disabled = true;

        button.textContent = "Loading...";



        log("Requesting In-App Interstitial...");



        try {



            const result = await show_11537060({

                type: "inApp",

                inAppSettings: {

                    frequency: 1,

                    interval: 0,

                    timeout: 0

                },

                requestVar: "inapp_button"

            });



            console.log("In-App result:", result);



            log(

                "In-App Interstitial request completed.\n" +

                JSON.stringify(result, null, 2)

            );



        } catch (error) {





            console.error("In-App error:", error);



            log(

                "In-App Interstitial failed:\n" +

                (error?.message || error)

            );



        } finally {



            setTimeout(() => {

                button.disabled = false;

                button.textContent = "📺 Show In-App Interstitial";

            }, 1000);



        }



    });



</script>



</body>

</html>

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c2055006-ee88-4177-aede-cdc54f01c3fe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
