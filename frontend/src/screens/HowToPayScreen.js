import React from "react";
import { Button } from "react-bootstrap";


function HowToPayScreen() {
    return (
        <div>
            <h1>How to pay via Easypaisa</h1>
            <h2>
                First of all thank you ❤️❤️❤️very much for choosing us. and now complete the
                steps below to pay
            </h2>
            <p>
                <ol>
                    <li>
                        <input type="checkbox" /> Pay on Easypaisa Account no.{" "}
                        <h3>03174373258</h3> with title <q>Usama Ashfaq</q>
                    </li>
                    <li>
                        <input type="checkbox" /> Send the screenshot to same no.
                        03174373258 via Whatsapp{" "}
                        <a href="https://wa.me/923174373258">
                            <Button variant="success">
                                <i class="fab fa-whatsapp">Whatsapp
                                </i>{" "}

                            </Button>{" "}</a>
                    </li>
                    <li>
                        Congratulation!. you are done. Your package will dispatched and
                        reached to your doorstep with in 3-4 days
                    </li>
                </ol>
            </p>
        </div>
    );
}

export default HowToPayScreen;
