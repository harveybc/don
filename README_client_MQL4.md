# Singularity: MQL4 Client

Periodically sends orders status, account status and market information as a pending evaluation request to a singularity node, and later request the evaluation result.

[![Build Status](https://travis-ci.org/harveybc/singularity.svg?branch=master)](https://travis-ci.org/harveybc/singularity)
[![Documentation Status](https://readthedocs.org/projects/docs/badge/?version=latest)](https://harveybc-singularity.readthedocs.io/en/latest/)
[![BCH compliance](https://bettercodehub.com/edge/badge/harveybc/singularity?branch=master)](https://bettercodehub.com/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/harveybc/singularity/blob/master/LICENSE)

## Description

Sends with a configurable periodicity, the following Web requests consecutively to a configurable URL:

### 1. Input Data Upload Request (POST /inputs)

It is a POST request in the /inputs route of the configured URL. It is used to upload the data to be evaluated to a singularity node where it can be fetched by an evaluator for processing.

The folowing are the _parameters_ of the request:

* __api_key__ : string provided to a client for authentication when created with the client role in a node of a singualrity network.
* __json_contents__ : data that will be stored in the nodes in a singularity network.

The following are the JSON_contents fields:
* __order_status__: The status (profit, buy_or_sell ,open_price, open_date, sl, tp) of all open orders for a configurable list of symbols.
* __account_status__: The current balance and equity.
* __market_info__: An array of price (high,low,open,close), volume, and a configurable list of technical indicators (TODO: List of numbered technical indicators) optionally for 3 configurable timeframes.

The following are the _response_ fields if the request was successful:

* __input_id__: identification of the input data, to be used from the following request.

The information transmitted to a singularity node is flagged as pending for evaluation, an evaluator in the network that is using the most optimized agent fetches the evaluation data, pre-process the information and evaluates the agent wich generate a trading action as result.

### 2. Pending Evaluation Request (POST /evaluations)

It is a POST request in the /evaluations route of the configured URL. It is used to create a new pending evaluation in a singularity node, it must contain as a parameter the __input_id__ of the data to be evaluated.

The folowing are the parameters of the request:

* __api_key__ : string provided to a client for authentication when created with the client role in a node of a singualrity network.
* __input_id__: identification of the input data, found on the response to an Input Data Upload request.

The following are the _response_ fields if the request was successful:

* __evaluation_id__: identification of the pending evaluation, to be used from the following request.

After a successful request (HTTP code:200), after a period of time, the client should start querying if the evaluation hasbeen done using the following request.

### 3. Evaluation Status Request (GET /evaluations/<evaluation_id>)

It is a GET request in the /evaluations/<evaluation_id> route of the configured URL. It is used to verify if a pending evaluation has been already processed and to get the id of the output (__output_id__), required to retrieve the results with the next request, it must be performed periodically after a pending evaluation request until its status is 2 (done).

The folowing are the parameters of the request:

* __api_key__ : string provided to a client for authentication when created with the client role in a node of a singualrity network.

The following are the _response_ fields if the request was successful:

* __status__: it can be 0 = pending, 1 = being processed by an evaluator, 2 = results generated and uploaded to the outputs table of singularity
* __output_id__: identification of the pending evaluation, to be used from the following request. It is void if the status is different from 2.

### 4. Evaluation Results Request (GET /outputs/<output_id>)

It is a GET  request in the /outputs/<output_id> route of the configured URL. It us used to retrieve the results from an evaluation, the output_id parameter is obtained when a pending evaluation gets to status 2.

The folowing are the parameters of the request:

* __api_key__ : string provided to a client for authentication when created with the client role in a node of a singualrity network.

The following are the _response_ fields if the request was successful:

* __json_results__ : JSON containing the results.

The json_contents variable contains an array of the size of the number of symbols configured, each array element contains the following fields for each symbol:

* __close_order__: boolean, if true, close existing order in this symbol
* __open_buy__: boolean, if true, opens a buy order
* __open_sell__: boolean, if true, opens a sell order
* __order_volume__: oder volume (if open_buy or open_sell)
* __open_price__: order open price (if open_buy or open_sell)
* __take_profit__: take profit in pips
* __stop_loss__: stop loss in pips

### 5. Removal of Input, Evaluation and Output Data from database (DELETE /inputs/<input_id> , DELETE /evaluations/<evaluation_id> , DELETE /outputs/<output_id>)

It is the consecutive execution of 3 requests with the HTTP DELETE method on the routes: /inputs/<input_id>, /outputs/<output_id>, /evaluations/<evaluation_id>

It deletes the input, output and evaluation registers from the singularity database to save space unless an historic of evaluation data is required.

The only parameter of the requests are the __api_key__, and they respond a code 200 if ok.

The client is implemented in the [singularity_client.mql4](https://github.com/harveybc/singularity/blob/master/clients/singularity_client.mql4).

## Installation

The module is installed with the singularity package, the instructions are described in the [singularity README](../master/README.md).

### Execution

The singularity_client MQL4 expert must be copied or linked from the clients folder in the singlarity repo, to the experts folder of Metatrader 4 where it can be loaded as any other expert.

### MQL4 Expert Parameters

* __--input_file <filename>__: The only mandatory parameter, is the filename for the input dataset to be trimmed.
* __--output_file <filename>__: (Optional) Filename for the output dataset. Defaults to the input dataset with the .output extension.
* __--output_config_file <filename>__: (Optional) Filename for the output configuration containing rows trimmed in columns 0 and columns trimmed in column 1. Defaults to the input dataset with the .config extension.
* __--input_config_file <filename>__: (Optional) Imports an existing configuration and trims a dataset with it.
* __--from_start <val>__:(Optional) number of rows to remove from the start of the input dataset.
* __--from_end <val>__: (Optional) number of rows to remove from the end of the input dataset.
* __--remove_columns__: (Optional) Removes all constant columns.
* __--no_auto_trim__: (Optional) Do not perform auto-trimming, useful if using the remove_columns, from_start or from_end options.

## Examples of usage
The following examples show both the class method and command line uses.

### Usage via Class Methods
```python
from singularity.data_trimmer.data_trimmer import DataTrimmer
# configure parameters (same vaiable names as command-line parameters)
class Conf:
    def __init__(self):
        self.input_file = "tests/data/test_input.csv"
conf = Conf()
# instance trimmer class and loads dataset
dt = DataTrimmer(conf)
# do the trimming
rows_t, cols_t = dt.trim_auto()
# save output to output file
dt.store()
```

### Usage via CLI

> data-trimmer --input_file "tests/data/test_input.csv"






