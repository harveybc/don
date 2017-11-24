'use strict';
/** Authorization model, uses Lucid for using ActiveQuery */
const Lucid = use('Lucid');
/** @desc
Authorization model. A authorization uses a blockchain to store data, generates a signal to create a new 
block in a desired block time or size. The block time control mechanism can be a 
PoW (Cyptographic or Optimization) or another block time or size control 
mechanisms.
@extends {Lucid}
 */
class Authorization extends Lucid {

}
module.exports = Authorization;
