/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluid-tools/fluidapp-odsp-urlresolver-previous";
import type * as current from "../../index";


// See 'build-tools/src/type-test-generator/compatibility.ts' for more information.
type TypeOnly<T> = T extends number
	? number
	: T extends string
	? string
	: T extends boolean | bigint | symbol
	? T
	: {
			[P in keyof T]: TypeOnly<T[P]>;
	  };

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_FluidAppOdspUrlResolver": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_FluidAppOdspUrlResolver():
    TypeOnly<old.FluidAppOdspUrlResolver>;
declare function use_current_ClassDeclaration_FluidAppOdspUrlResolver(
    use: TypeOnly<current.FluidAppOdspUrlResolver>);
use_current_ClassDeclaration_FluidAppOdspUrlResolver(
    get_old_ClassDeclaration_FluidAppOdspUrlResolver());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_FluidAppOdspUrlResolver": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_FluidAppOdspUrlResolver():
    TypeOnly<current.FluidAppOdspUrlResolver>;
declare function use_old_ClassDeclaration_FluidAppOdspUrlResolver(
    use: TypeOnly<old.FluidAppOdspUrlResolver>);
use_old_ClassDeclaration_FluidAppOdspUrlResolver(
    get_current_ClassDeclaration_FluidAppOdspUrlResolver());
