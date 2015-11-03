<?php

use Aerys\{ Websocket, Host, Request, Response, Router, function root, function router, function websocket };

/* --- Global server options -------------------------------------------------------------------- */

const AERYS_OPTIONS = [
    "keepAliveTimeout" => 60,
    //"deflateMinimumLength" => 0,
];

/* --- http://localhost:1337/ ------------------------------------------------------------------- */


class CMS implements Aerys\Websocket {
    /**
     * Invoked when starting the server
     *
     * All messages are sent to connected clients by calling methods on the
     * Endpoint instance passed in onStart(). Applications must store
     * the endpoint instance for use once the server starts.
     *
     * If the websocket application has external resources it needs to initialize
     * (like database connections) this is the place to do it.
     *
     * If this method is a Generator it will be resolved as a coroutine before
     * the server is allowed to start. Additionally, this method returns a
     * Promise the server will not start until that promise resolves.
     *
     * @param \Aerys\Endpoint $endpoint
     * @return mixed
     */
    public function onStart(Websocket\Endpoint $endpoint) {
        print "onStart\n";
    }

    /**
     * Respond to websocket handshake requests
     *
     * If a websocket application doesn't wish to impose any special constraints on the
     * handshake it doesn't have to do anything in this method and all handshakes will
     * be automatically accepted.
     *
     * The return value from onHandshake() invocation (which may be the eventual generator
     * return expression) is passed as the second parameter to onOpen().
     *
     * @param \Aerys\Request $request The HTTP request that instigated the handshake
     * @param \Aerys\Response $response Used to set headers and/or reject the handshake
     * @return mixed
     */
    public function onHandshake(Request $request, Response $response) {
        print "onHandshake\n";
    }

    /**
     * Invoked when the full two-way websocket upgrade completes
     *
     * @param int $clientId A unique (to the current process) identifier for this client
     * @param mixed $handshakeData The return value from onHandshake() for this client
     * @return mixed
     */
    public function onOpen(int $clientId, $handshakeData) {
        print "onOpen\n";
    }

    /**
     * Invoked when data messages arrive from the client
     *
     * @param int $clientId A unique (to the current process) identifier for this client
     * @param \Aerys\WebsocketMessage $msg A stream of data received from the client
     * @return mixed
     */
    public function onData(int $clientId, Websocket\Message $msg) {
        print $msg . "\n";

        $this->clients[0]->send($msg);
    }

    /**
     * Invoked when the close handshake completes
     *
     * @param int $clientId A unique (to the current process) identifier for this client
     * @param int $code The websocket code describing the close
     * @param string $reason The reason for the close (may be empty)
     * @return mixed
     */
    public function onClose(int $clientId, int $code, string $reason) {
        print "client quit\n";
    }

    /**
     * Invoked when the server is stopping
     *
     * If the application initialized resources in Websocket::onStart() this is the
     * place to free them.
     *
     * There is no need to call Endpoint::close() in this method because the
     * websocket endpoint automatically closes all connected clients before this application
     * method is ever invoked.
     *
     * If this method is a Generator it will be resolved as a coroutine before the server
     * is allowed to fully shutdown. Additionally, if this method returns a Promise the
     * server will not shutdown until that promise resolves.
     *
     * @return mixed
     */
    public function onStop() {

    }
}

$router = router()
    ->route("GET", "/", function(Request $req, Response $res) {
        $res->send("<html><body><h1>Hello, world.</h1></body></html>");
    })
    ->route("GET", "/ws", websocket(new CMS));

(new Host)
    ->expose("*", 8005)
    ->use($router);
