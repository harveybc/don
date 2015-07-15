/* 
 * File:   Axon.h
 * Author: harveybc
 *
 * Maps neuron synapses to communication axon and manages the messages 
 * going trough them. Each axon is a deque of messages. The axon has a
 * physical variable length to model the wave's phase and is divided in segments
 * (elements of the deque) with variable physical length to model the wave´s 
 * propagation speed. The weight of the axon, models the atenuation of the 
 * signal upon arrival to target.
 * 
 * Each axon must implement it's activation function.
 * 
 * Created on 9 de junio de 2015, 11:30 AM
 */

#ifndef AXON_H
#define	AXON_H
#include <deque>

template <class MessageClass>
class Axon {
public:
    // message management
    MessageClass read_msg(int segment);        ///< returns the front of the deque
    void push_msg(MessageClass msg);///< puts msg into the back of the deque
    void pop_msg();                 ///< removes msg from the front of the queue
    // buffer management
    int get_buffer_size();          ///< returns the buffer size
    void resize_buffer(int if_size);///< changes the size of the buffer
    void reset(MessageClass init_msg);  ///< fills the buffer with the init_msg
    // constructors
    Axon(int if_size, MessageClass init_msg); 
    Axon(const Axon& orig);
    virtual ~Axon();
private:
   // vector de axon 
    std::deque <MessageClass> buffer;
};

#endif	/* AXON_H */

