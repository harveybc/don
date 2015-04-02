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
CND_CONF=Debug
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
	${OBJECTDIR}/Neuron_d_in.o \
	${OBJECTDIR}/Singularity.o \
	${OBJECTDIR}/TX_Expert_Simple.o \
	${OBJECTDIR}/TX_Neuron_d.o \
	${OBJECTDIR}/TX_SANN.o \
	${OBJECTDIR}/Taxon.o \
	${OBJECTDIR}/Taxonomy.o \
	${OBJECTDIR}/main.o

# Test Directory
TESTDIR=${CND_BUILDDIR}/${CND_CONF}/${CND_PLATFORM}/tests

# Test Files
TESTFILES= \
	${TESTDIR}/TestFiles/f1

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
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Dataset.o Dataset.cpp

${OBJECTDIR}/Expert.o: Expert.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert.o Expert.cpp

${OBJECTDIR}/Expert_SANN.o: Expert_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_SANN.o Expert_SANN.cpp

${OBJECTDIR}/Expert_Simple.o: Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_Simple.o Expert_Simple.cpp

${OBJECTDIR}/FractalMachine.o: FractalMachine.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalMachine.o FractalMachine.cpp

${OBJECTDIR}/FractalTape.o: FractalTape.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalTape.o FractalTape.cpp

${OBJECTDIR}/Neuron.o: Neuron.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron.o Neuron.cpp

${OBJECTDIR}/Neuron_d.o: Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_d.o Neuron_d.cpp

${OBJECTDIR}/Neuron_d_in.o: Neuron_d_in.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_d_in.o Neuron_d_in.cpp

${OBJECTDIR}/Singularity.o: Singularity.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Singularity.o Singularity.cpp

${OBJECTDIR}/TX_Expert_Simple.o: TX_Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Expert_Simple.o TX_Expert_Simple.cpp

${OBJECTDIR}/TX_Neuron_d.o: TX_Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Neuron_d.o TX_Neuron_d.cpp

${OBJECTDIR}/TX_SANN.o: TX_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_SANN.o TX_SANN.cpp

${OBJECTDIR}/Taxon.o: Taxon.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxon.o Taxon.cpp

${OBJECTDIR}/Taxonomy.o: Taxonomy.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxonomy.o Taxonomy.cpp

${OBJECTDIR}/main.o: main.cpp 
	${MKDIR} -p ${OBJECTDIR}
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/main.o main.cpp

# Subprojects
.build-subprojects:

# Build Test Targets
.build-tests-conf: .build-conf ${TESTFILES}
${TESTDIR}/TestFiles/f1: ${TESTDIR}/tests/Neuron_d_test.o ${OBJECTFILES:%.o=%_nomain.o}
	${MKDIR} -p ${TESTDIR}/TestFiles
	${LINK.cc}   -o ${TESTDIR}/TestFiles/f1 $^ ${LDLIBSOPTIONS} 


${TESTDIR}/tests/Neuron_d_test.o: tests/Neuron_d_test.cpp 
	${MKDIR} -p ${TESTDIR}/tests
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -I. -MMD -MP -MF "$@.d" -o ${TESTDIR}/tests/Neuron_d_test.o tests/Neuron_d_test.cpp


${OBJECTDIR}/Dataset_nomain.o: ${OBJECTDIR}/Dataset.o Dataset.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Dataset.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Dataset_nomain.o Dataset.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Dataset.o ${OBJECTDIR}/Dataset_nomain.o;\
	fi

${OBJECTDIR}/Expert_nomain.o: ${OBJECTDIR}/Expert.o Expert.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Expert.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_nomain.o Expert.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Expert.o ${OBJECTDIR}/Expert_nomain.o;\
	fi

${OBJECTDIR}/Expert_SANN_nomain.o: ${OBJECTDIR}/Expert_SANN.o Expert_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Expert_SANN.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_SANN_nomain.o Expert_SANN.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Expert_SANN.o ${OBJECTDIR}/Expert_SANN_nomain.o;\
	fi

${OBJECTDIR}/Expert_Simple_nomain.o: ${OBJECTDIR}/Expert_Simple.o Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Expert_Simple.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Expert_Simple_nomain.o Expert_Simple.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Expert_Simple.o ${OBJECTDIR}/Expert_Simple_nomain.o;\
	fi

${OBJECTDIR}/FractalMachine_nomain.o: ${OBJECTDIR}/FractalMachine.o FractalMachine.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/FractalMachine.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalMachine_nomain.o FractalMachine.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/FractalMachine.o ${OBJECTDIR}/FractalMachine_nomain.o;\
	fi

${OBJECTDIR}/FractalTape_nomain.o: ${OBJECTDIR}/FractalTape.o FractalTape.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/FractalTape.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/FractalTape_nomain.o FractalTape.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/FractalTape.o ${OBJECTDIR}/FractalTape_nomain.o;\
	fi

${OBJECTDIR}/Neuron_nomain.o: ${OBJECTDIR}/Neuron.o Neuron.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Neuron.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_nomain.o Neuron.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Neuron.o ${OBJECTDIR}/Neuron_nomain.o;\
	fi

${OBJECTDIR}/Neuron_d_nomain.o: ${OBJECTDIR}/Neuron_d.o Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Neuron_d.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_d_nomain.o Neuron_d.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Neuron_d.o ${OBJECTDIR}/Neuron_d_nomain.o;\
	fi

${OBJECTDIR}/Neuron_d_in_nomain.o: ${OBJECTDIR}/Neuron_d_in.o Neuron_d_in.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Neuron_d_in.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Neuron_d_in_nomain.o Neuron_d_in.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Neuron_d_in.o ${OBJECTDIR}/Neuron_d_in_nomain.o;\
	fi

${OBJECTDIR}/Singularity_nomain.o: ${OBJECTDIR}/Singularity.o Singularity.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Singularity.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Singularity_nomain.o Singularity.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Singularity.o ${OBJECTDIR}/Singularity_nomain.o;\
	fi

${OBJECTDIR}/TX_Expert_Simple_nomain.o: ${OBJECTDIR}/TX_Expert_Simple.o TX_Expert_Simple.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/TX_Expert_Simple.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Expert_Simple_nomain.o TX_Expert_Simple.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/TX_Expert_Simple.o ${OBJECTDIR}/TX_Expert_Simple_nomain.o;\
	fi

${OBJECTDIR}/TX_Neuron_d_nomain.o: ${OBJECTDIR}/TX_Neuron_d.o TX_Neuron_d.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/TX_Neuron_d.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_Neuron_d_nomain.o TX_Neuron_d.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/TX_Neuron_d.o ${OBJECTDIR}/TX_Neuron_d_nomain.o;\
	fi

${OBJECTDIR}/TX_SANN_nomain.o: ${OBJECTDIR}/TX_SANN.o TX_SANN.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/TX_SANN.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/TX_SANN_nomain.o TX_SANN.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/TX_SANN.o ${OBJECTDIR}/TX_SANN_nomain.o;\
	fi

${OBJECTDIR}/Taxon_nomain.o: ${OBJECTDIR}/Taxon.o Taxon.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Taxon.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxon_nomain.o Taxon.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Taxon.o ${OBJECTDIR}/Taxon_nomain.o;\
	fi

${OBJECTDIR}/Taxonomy_nomain.o: ${OBJECTDIR}/Taxonomy.o Taxonomy.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/Taxonomy.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/Taxonomy_nomain.o Taxonomy.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/Taxonomy.o ${OBJECTDIR}/Taxonomy_nomain.o;\
	fi

${OBJECTDIR}/main_nomain.o: ${OBJECTDIR}/main.o main.cpp 
	${MKDIR} -p ${OBJECTDIR}
	@NMOUTPUT=`${NM} ${OBJECTDIR}/main.o`; \
	if (echo "$$NMOUTPUT" | ${GREP} '|main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T main$$') || \
	   (echo "$$NMOUTPUT" | ${GREP} 'T _main$$'); \
	then  \
	    ${RM} "$@.d";\
	    $(COMPILE.cc) -g -I/D/Dropbox/Singularity/Singularity -Dmain=__nomain -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/main_nomain.o main.cpp;\
	else  \
	    ${CP} ${OBJECTDIR}/main.o ${OBJECTDIR}/main_nomain.o;\
	fi

# Run Test Targets
.test-conf:
	@if [ "${TEST}" = "" ]; \
	then  \
	    ${TESTDIR}/TestFiles/f1 || true; \
	else  \
	    ./${TEST} || true; \
	fi

# Clean Targets
.clean-conf: ${CLEAN_SUBPROJECTS}
	${RM} -r ${CND_BUILDDIR}/${CND_CONF}
	${RM} ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/singularity.exe

# Subprojects
.clean-subprojects:

# Enable dependency checking
.dep.inc: .depcheck-impl

include .dep.inc
