#
# Generated Makefile - do not edit!
#
# Edit the Makefile in the project folder instead (../Makefile). Each target
# has a -pre and a -post target defined where you can add customized code.
#
# This makefile implements configuration specific macros and targets.


# Environment
MKDIR=mkdir
CP=cp
GREP=grep
NM=nm
CCADMIN=CCadmin
RANLIB=ranlib
CC=gcc
CCC=g++
CXX=g++
FC=gfortran
AS=as

# Macros
CND_PLATFORM=MinGW-Windows
CND_DLIB_EXT=dll
CND_CONF=Release
CND_DISTDIR=dist
CND_BUILDDIR=build

# Include project Makefile
include Makefile

# Object Directory
OBJECTDIR=${CND_BUILDDIR}/${CND_CONF}/${CND_PLATFORM}

# Object Files
OBJECTFILES= \
	${OBJECTDIR}/Dataset.o \
	${OBJECTDIR}/Expert.o \
	${OBJECTDIR}/Expert_SANN.o \
	${OBJECTDIR}/Expert_Simple.o \
	${OBJECTDIR}/FractalMachine.o \
	${OBJECTDIR}/FractalTape.o \
	${OBJECTDIR}/Neuron.o \
	${OBJECTDIR}/Neuron_d.o \
	${OBJECTDIR}/Singularity.o \
	${OBJECTDIR}/TX_Expert_Simple.o \
	${OBJECTDIR}/TX_Neuron_d.o \
	${OBJECTDIR}/TX_SANN.o \
	${OBJECTDIR}/Taxon.o \
	${OBJECTDIR}/Taxonomy.o \
	${OBJECTDIR}/main.o


# C Compiler Flags
CFLAGS=

# CC Compiler Flags
CCFLAGS=
CXXFLAGS=

# Fortran Compiler Flags
FFLAGS=

# Assembler Flags
ASFLAGS=

# Link Libraries and Options
LDLIBSOPTIONS=

# Build Targets
.build-conf: ${BUILD_SUBPROJECTS}
	"${MAKE}"  -f nbproject/Makefile-${CND_CONF}.mk ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/singularity.exe

${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/singularity.exe: ${OBJECTFILES}
	${MKDIR} -p ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}
	${LINK.cc} -o ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/singularity ${OBJECTFILES} ${LDLIBSOPTIONS}

${OBJECTDIR}/Dataset.o: Dataset.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Dataset.o Dataset.cpp

${OBJECTDIR}/Expert.o: Expert.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert.o Expert.cpp

${OBJECTDIR}/Expert_SANN.o: Expert_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_SANN.o Expert_SANN.cpp

${OBJECTDIR}/Expert_Simple.o: Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_Simple.o Expert_Simple.cpp

${OBJECTDIR}/FractalMachine.o: FractalMachine.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalMachine.o FractalMachine.cpp

${OBJECTDIR}/FractalTape.o: FractalTape.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalTape.o FractalTape.cpp

${OBJECTDIR}/Neuron.o: Neuron.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron.o Neuron.cpp

${OBJECTDIR}/Neuron_d.o: Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_d.o Neuron_d.cpp

${OBJECTDIR}/Singularity.o: Singularity.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Singularity.o Singularity.cpp

${OBJECTDIR}/TX_Expert_Simple.o: TX_Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Expert_Simple.o TX_Expert_Simple.cpp

${OBJECTDIR}/TX_Neuron_d.o: TX_Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Neuron_d.o TX_Neuron_d.cpp

${OBJECTDIR}/TX_SANN.o: TX_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_SANN.o TX_SANN.cpp

${OBJECTDIR}/Taxon.o: Taxon.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxon.o Taxon.cpp

${OBJECTDIR}/Taxonomy.o: Taxonomy.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxonomy.o Taxonomy.cpp

${OBJECTDIR}/main.o: main.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -O2 -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/main.o main.cpp

# Subprojects
.build-subprojects:

# Clean Targets
.clean-conf: ${CLEAN_SUBPROJECTS}
	${RM} -r ${CND_BUILDDIR}/${CND_CONF}
	${RM} ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/singularity.exe

# Subprojects
.clean-subprojects:

# Enable dependency checking
.dep.inc: .depcheck-impl

include .dep.inc
