cmake_minimum_required(VERSION 3.20)
project(nocovka-doc LANGUAGES NONE) 

# Path to LaTeX source folder
set(LATEX_DIR ${CMAKE_CURRENT_SOURCE_DIR}/latex_doc)
set(MAIN_TEX nocovka.tex)
#set(OUTPUT_PDF ${CMAKE_CURRENT_BINARY_DIR}/nocovka.pdf)

# Custom target to build docs
add_custom_target(docs
	COMMAND ${CMAKE_COMMAND} -E chdir ${LATEX_DIR} lualatex ${MAIN_TEX}
	COMMAND ${CMAKE_COMMAND} -E chdir ${LATEX_DIR} makeglossaries nocovka
	COMMAND ${CMAKE_COMMAND} -E chdir ${LATEX_DIR} lualatex ${MAIN_TEX}
	COMMAND ${CMAKE_COMMAND} -E chdir ${LATEX_DIR} lualatex ${MAIN_TEX}
	COMMENT "Building PDF documentation with lualatex and makeglossaries"
)
