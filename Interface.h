/* 
 * File:   Interface.h
 * Author: harveybc
 *
 * Maps node connections to communication interfaces and manages the messages 
 * going trough them. Each interface is a deque of messages. The interface has a
 * physical variable length to model the wave's phase and is divided in segments
 * (elements of the deque) with variable physical length to model the wave´s 
 * propagation speed. The weight of the interface, models the atenuation of the 
 * signal upon arrival to target.
 * 
 * Created on 9 de junio de 2015, 11:30 AM
 */

#ifndef INTERFACE_H
#define	INTERFACE_H

template <class MessageClass>
class Interface {
public:
    // message management
    MessageClass read_msg();        ///< returns the front of the deque
    void push_msg(MessageClass msg);///< puts msg into the back of the deque
    void pop_msg();                 ///< removes msg from the front of the queue
    // buffer management
    int get_buffer_size();          ///< returns the buffer size
    void resize_buffer(int if_size);///< changes the size of the buffer
    void reset(MessageClass init_msg);  ///< fills the buffer with the init_msg
    // constructors
    Interface(int if_size, MessageClass init_msg); 
    Interface(const Interface& orig);
    virtual ~Interface();
private:
   // vector de interfaces 
    std::deque <MessageClass> buffer;
};

#endif	/* INTERFACE_H */

