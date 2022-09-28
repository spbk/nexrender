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
	                "auth_token": "abc22313dsf"
                }
            }
        ]
    }
}
```

## Information
* `params` required argument, object containing parameters for the webhook 

