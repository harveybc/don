/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef Neuron_H
#define	Neuron_H
#include <cstdint>
#include <array>
#include <forward_list>
#include "Synapse.h"

class Neuron {
public:
    // general neuron attributes
    bool active;        ///< FALSE when the neuron is deleted, also become recesive gene for NE (def:true)
    // neural network flags
    bool evaluated;     ///< TRUE if neuron has been evaluated (def:false)
    // neurotransmitter code (5bit, max value :32)
    uint8_t neurotransmitter;
    // membrane charge leaking
    float Qleak; ///< leaking charge factor (def: Gm/Cm  = 10)
    // action potential timing
    uint16_t action_potential_period;    ///< duration of action potential polarization and depolarization(def:2)
    uint16_t remaining_action_potential; ///< remaining clock ticks of action potential
    uint16_t refractory_period;          ///< refractory period in milliseconds (def:2)
    uint16_t remaining_refractory;       ///< remaining refractory period in milliseconds

    // epigenetics: synaptogenesis, neurogenesis and prunning, Harvey 2015 :)
    // permanent changes in the genome caused by neurotransmitters, synaptic or neuronal activity
    // uses a two phase evaluation and a neuroevolution training phase: 
    //      1. maduration:  do synaptic pruning and release nt for controlling prob prunning y prob synaptogenesis, and prob inheritable in  the next phase
    //      2. practice:  do synaptogénesis and release nt for controlling prob prunning y neuro/synaptogenesis, and prob inheritable in neuroevolution 
    //      3. training: use  prob pruning y neuro/synaptogenesis, and prob inheritable(little mutation factor, low mutation prob) during neuroevolution's mutation and crossover 
    float prob_synaptogenesis; ///< increases with neural activity and prob_inheritable, if negative, is probability of synaptic prunnig
    float prob_neurogenesis;   ///< increases with local complexity if negative, is probability of neural prunnig
    float prob_inheritable;    ///< increases with increases with fitness changes related
                               ///< to pruning or neurogenesis. A change of fitness 
                               ///< between neurogenesis events causes all presynaptic  
                               ///< neurons to modify their prob_inheritable)
    // axon
    float axon_speed;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    float axon_feedback_strength; ///< strength of the feedback connection n Coulombs/spike (def:7.5e-11) 
    bool bidirectional; //  def: true if axosomatic synapse length < 40um (def:true)
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    std::vector <uint32_t> axon;    ///< neuron's communications axon with 32 bit spike trains
    std::vector <uint32_t> axon_feedback;    ///<  used for bidirectional axon's  propagation
    // extracellular activity masks for up to 32 neurotransmitters(NT)and receptors(NR)  
    uint32_t neurotransmitter_mask;  ///< def: 0x1 hex (first NT enabled )
    uint32_t nt_receptor_mask; ///< def: 0x1 hex (first NT receptor enabled)
    // synapses
    std::vector<Synapse> axodendritic_synapses;  ///< neuron´s axo dendritic and axosomatic synapses
    std::vector<Synapse> axosomatic_synapses;  ///< neuron´s axo dendritic and axosomatic synapses
    std::vector<Synapse> axosynaptic_and_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosynaptic_or_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosynaptic_modulated_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoaxonic_and_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoaxonic_or_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoextracellular_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosecretory_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    // methonds
    void push_message(int msg);     ///< pushes a message in the axon´s front and removes the oldest from the back
    // constructors
    Neuron(
        // general attributes
        int parent_id_,  ///< Parent neuron's identification number
        int recursive_,  ///< Number of times this neuron must be evaluated
        bool active_,    ///< FALSE when the neuron is deleted
        // neural network flags
        bool evaluated_, ///< TRUE if neuron has been evaluated
        char neuron_type_,  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
        // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
        float Qm_,     ///< membrane charge (def: -70mv*10nF)
        float Cm_,      ///< membrane capacintance (def: 10nF)
        float Gm_,     ///< membrane conductance (def: 100nS)
        float Qth_,   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
        float Qss_,    ///< membrane steady state (resting) charge (def: -70mv*10nF)
        // intrinsic currents for pacemaker neurons (Beer, 1990) 
        float Q_min_, ///< membrane intrinsic current charge threshold (-54mV*10nF)
        float Ih_,        ///< intrinsic depolarizing current
        float Il_,       ///< intrinsic hyperpolarizing current
        float Th_,         ///< time Ih should remain active (def:100ms)
        float Mtl_,              ///< slope of line used to calculate Tl
        float Btl_,              ///< initial time used to calculate Tl
        // action potential timming
        int action_potential_period_,  ///< duration of action potential polarization and depolarization
        int remaining_action_potential_,   ///< remaining time of action potential
        int refractory_period_,        ///< refractory period in milliseconds
        int remaining_refractory_,     ///< rremaining refractory period in milliseconds
        // synaptogenesis and neurogenesis and prunning
        float prob_synaptogenesis_,    ///< increases with neural activity, if negative, is probability of synaptic prunnig
        float prob_neurogenesis_,      ///< increases with local complexity if negative, is probability of neural prunnig
        // extracellular activity bit masks (neurotransmitters, receptors and modulators)
        // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
        //                      2=axosynaptic, 3=axosecretory/extracellular 
        uint32_t neurotransmitter_mask,
        uint32_t nt_receptor_mask
    );
    // constructos
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:
};

#endif	/* Neuron_H */

