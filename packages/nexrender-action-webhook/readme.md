# Action: Webhook

Notify status over webhook

## Installation

```
npm i @nexrender/action-webhook -g
```

## Usage

When creating your render job provide this module as one of the `postrender` actions:

```json
// job.json
{
    "actions": {
        "finished": [
            {
                "module": "@nexrender/action-webook",
                "params": {
                    "callback": "https://myapp.com/nexrender/job",
                    "http_method: "post",
                    "skip_ssl_validation": false
                }
            }
        ]
    }
}
```

## Information
* `params` required argument, object containing parameters for the webhook 
* `params.callback` required argument, URL to make the callback to
* `params.http_method` optional argument, http method to use in callback, defaults to post
* `params.skip_ssl_validation` optional argument, skip SSL certificate validation
