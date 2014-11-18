/**
 * @mainpage
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * @brief       Taxonomy class template
 * @par Description @parblock
 *      Crea una estructura jerárquica de objetos(taxones) en el estado de una
 *      máquina de Turing fractal desde una cinta de Turing.
 * @endparblock
 * @copyright @parblock
 *    This file is part of Singularity.
 *
 *    Singularity is free software; you can redistribute it and/or modify it under
 *    the terms of the GNU General Public License as published by the Free
 *    Software Foundation; either version 3, or (at your option) any later
 *    version.
 *
 *    Singularity is distributed in the hope that it will be useful, but WITHOUT ANY
 *    WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *    FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 *    for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with GCC; see the file COPYING3.  If not see
 *    <http://www.gnu.org/licenses/>.
 * @endparblock
 * @file        Taxonomy.h
 * @version     0.1
 * @date        22 de mayo de 2014, 10:18 PM
 */
#ifndef TAXONOMY_H
#define	TAXONOMY_H
#include <string>
#include <fstream>
#include <iostream>
#include "FractalMachine.h"
#include "FractalTape.h"
#include "Taxon.h"
#include "Expert.h"

template <class TaxonClass> ///< para IA, taxonClass=Expert
class Taxonomy: public Taxon<TaxonClass> {
public:
    int get_taxonomy(FractalMachine <TaxonClass> &output); ///< Crea el estado de una máquina fractal desde una cinta de instrucciones
    int get_taxon(int fractal_coords, TaxonClass &output); ///< Obtiene un taxón
    int add_taxons(int fractal_coords, TaxonClass taxon, int quantity); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int remove_taxon(int fractal_coords); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int replace_taxon(int fractal_coords, TaxonClass taxon); ///< Agrega una categoría a la taxonomía como hija de la categoría especificada
    int export_taxonomy(std::string file_path); ///< Exporta la taxonomía a un archivo JSON o XML
    int import_taxonomy(std::string file_path); // < Importa la taxonomía desde un archivo JSON o XML
    Taxonomy();
    Taxonomy(const Taxonomy& orig);
    virtual ~Taxonomy();
protected:
    FractalMachine <TaxonClass> taxons; ///< Una taxonomía es el estado de una m´qauina fractal de taxones decrito por una cinta de turing que contiene instrucciones para cada objeto existente en una iteración
};

/*** Taxonomy JSON
 * {
 *  "taxons": <FractalaMachine>
 *
 * }
 */
#endif	/* TAXONOMY_H */
/* Taxonomia en JSON:
{
    "id" : 1,
    "parent_id" : 0,
    "active_taxon" : 0,
    "description" : "taxonomía inicial",
    "input_interfaces" : [
        []
    ],
    "output_interfaces" : [
        []
    ],
    "connections" : [
 *      {
            "conn_type" : 0,
            "conn_members" : [
                {
                    "remote_id" : 0,
                    "local_interface" : 0,
                    "length" : 0,
                    "radius" : 0,
                    "sensitivity" : 0,
                    "local_interface" : 0,
                    "remote_interface" : 0,
                }
            ]
        }
    ],
    "tags" : [
        "tag0"
    ],
    "taxons" :
    {
        "fractal_tape" : [
        {
            "id" : 0, "parameters" : [
            
            ]
        }
        ],
        "fractal_machine_state" : [
        {
            "id" : "1",
            "parent_id" : "0",
            "active_taxon" : "0",
            "description" : "taxonomía inicial",
            "msg_buffer" : [
            {
                "value" : "0"
            }
            ],
            "input_interfaces" : [
            {
                "value" : [
                {
                    "value" : "0"
                }
                ]
            }
            ],
            "output_interfaces" : [
            {
                "value" : [
                {
                    "value" : "0"
                }
                ]
            }
            ],
            "input_interfaces" : [
            {
                "value" : [
                {
                    "value" : "0"
                }
                ]
            }
            ],
            "connections" : [
            {
                "conn_type" : "0",
                "conn_members" : [
                {
                    "remote_id" : "0",
                    "local_interface" : "0",
                    "remote_interface" : "0"
                }
                ]
            }
            ],
            "tags" : [
            {
                "value" : "0"
            }
            ]
        }
        ],
        "taxon_register" : [
        {
            "id" : "1",
            "parent_id" : "0",
            "active_taxon" : "0",
            "description" : "taxonomía inicial",
            "input_interfaces" : [
            {
                "value" : [
                {
                    "value" : "0"
                }
                ]
            }
            ],
            "output_interfaces" : [
            {
                "value" : [
                {
                    "value" : "0"
                }
                ]
            }
            ],
            "connections" : [
            {
                "value" :
                {
                    "conn_type" : "0",
                    "conn_members" : [
                    {
                        "value" :
                        {
                            "remote_id" : "0",
                            "local_interface" : "0",
                            "remote_interface" : "0"
                        }
                    }
                    ]
                }
            }
            ],
            "tags" : [
            {
                "value" : "0"
            }
            ]
        }
        ],
        "conn_register" : [
        {
            "conn_type" : "0",
            "conn_members" : [
            {
                "remote_id" : "0",
                "length" : "0",
                "radius" : "1",
                "Sensitivity" : "1",
                "local_interface" : "0",
                "remote_interface" : "0"
            }
            ]
        }
        ]
    }
}



 */