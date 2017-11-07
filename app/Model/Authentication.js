'use strict';
/** Authentication model, uses Lucid for using ActiveQuery */
const Lucid = use('Lucid');
/** @desc
Authentication model. A authentication uses a blockchain to store data, generates a signal to create a new 
block in a desired block time or size. The block time control mechanism can be a 
PoW (Cyptographic or Optimization) or another block time or size control 
mechanisms.
@extends {Lucid}
 */
class Authentication extends Lucid {

}
module.exports = Authentication;
