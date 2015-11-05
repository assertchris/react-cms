<?php

class Backend implements Aerys\Websocket
{
    private $endpoint;

    private $updates = [];

    private $deletes = [];

    private $pages = [
        [
            "id"    => 1,
            "title" => "Home",
            "body"  => "...",
        ],
        [
            "id"    => 2,
            "title" => "About Us",
            "body"  => "...",
        ],
        [
            "id"    => 3,
            "title" => "Contact Us",
            "body"  => "...",
        ],
        [
            "id"    => 4,
            "title" => "Products",
            "body"  => "...",
        ],
        [
            "id"    => 5,
            "title" => "Burning Baskets",
            "body"  => "...",
        ],
    ];

    public function onStart(Aerys\Websocket\Endpoint $endpoint)
    {
        $this->endpoint = $endpoint;
    }

    public function onHandshake(Aerys\Request $request, Aerys\Response $response)
    {
        // TODO: Implement onHandshake() method.
    }

    public function onOpen(int $clientId, $handshakeData)
    {
        // TODO: Implement onOpen() method.
    }

    public function onData(int $clientId, Aerys\Websocket\Message $message)
    {
        $body = yield $message;
        $json = json_decode($body, true);

        if (is_array($json) && isset($json["method"])) {
            if ($json["method"] == "all") {
                $this->endpoint->send(
                    $clientId,
                    json_encode([
                        "method" => "data",
                        "data"   => $this->all(),
                    ])
                );
            }

            if ($json["method"] == "update") {
                $this->updates[] = $json["data"];

                $this->endpoint->send(
                    null,
                    json_encode([
                        "method" => "data",
                        "data"   => $this->all(),
                    ])
                );
            }

            if ($json["method"] == "delete") {
                $this->deletes[] = $json["data"][0];

                $this->endpoint->send(
                    null,
                    json_encode([
                        "method" => "data",
                        "data"   => $this->all(),
                    ])
                );
            }
        }
    }

    private function all()
    {
        return array_values(array_map(
            function($page) {
                $modified = $page;

                foreach ($this->updates as $update) {
                    if ($update[0] == $page["id"]) {
                        $modified[$update[1]] = $update[2];
                    }
                }

                return $modified;
            },
            array_filter($this->pages, function($page) {
                foreach ($this->deletes as $delete) {
                    if ($delete == $page["id"]) {
                        return false;
                    }
                }

                return true;
            })
        ));
    }

    public function onClose(int $clientId, int $code, string $reason)
    {
        // TODO: Implement onClose() method.
    }

    public function onStop()
    {
        // TODO: Implement onStop() method.
    }
}

$router = Aerys\router();

$router->get("/", function (Aerys\Request $request, Aerys\Response $response) {
    $response->end("Hello, world");
});

$backend = new Backend();

$router->get("/ws", Aerys\websocket($backend));

$host = new Aerys\Host();
$host->expose("127.0.0.1", 8000)->use($router);
