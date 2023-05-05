/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import * as old from "@fluidframework/server-local-server-previous";
import * as current from "../../index";

type TypeOnly<T> = {
    [P in keyof T]: TypeOnly<T[P]>;
};

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILocalDeltaConnectionServer": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILocalDeltaConnectionServer():
    TypeOnly<old.ILocalDeltaConnectionServer>;
declare function use_current_InterfaceDeclaration_ILocalDeltaConnectionServer(
    use: TypeOnly<current.ILocalDeltaConnectionServer>);
use_current_InterfaceDeclaration_ILocalDeltaConnectionServer(
    // @ts-expect-error compatibility expected to be broken
    get_old_InterfaceDeclaration_ILocalDeltaConnectionServer());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILocalDeltaConnectionServer": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILocalDeltaConnectionServer():
    TypeOnly<current.ILocalDeltaConnectionServer>;
declare function use_old_InterfaceDeclaration_ILocalDeltaConnectionServer(
    use: TypeOnly<old.ILocalDeltaConnectionServer>);
use_old_InterfaceDeclaration_ILocalDeltaConnectionServer(
    get_current_InterfaceDeclaration_ILocalDeltaConnectionServer());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalDeltaConnectionServer": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_LocalDeltaConnectionServer():
    TypeOnly<old.LocalDeltaConnectionServer>;
declare function use_current_ClassDeclaration_LocalDeltaConnectionServer(
    use: TypeOnly<current.LocalDeltaConnectionServer>);
use_current_ClassDeclaration_LocalDeltaConnectionServer(
    // @ts-expect-error compatibility expected to be broken
    get_old_ClassDeclaration_LocalDeltaConnectionServer());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalDeltaConnectionServer": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_LocalDeltaConnectionServer():
    TypeOnly<current.LocalDeltaConnectionServer>;
declare function use_old_ClassDeclaration_LocalDeltaConnectionServer(
    use: TypeOnly<old.LocalDeltaConnectionServer>);
use_old_ClassDeclaration_LocalDeltaConnectionServer(
    get_current_ClassDeclaration_LocalDeltaConnectionServer());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalOrdererManager": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_LocalOrdererManager():
    TypeOnly<old.LocalOrdererManager>;
declare function use_current_ClassDeclaration_LocalOrdererManager(
    use: TypeOnly<current.LocalOrdererManager>);
use_current_ClassDeclaration_LocalOrdererManager(
    get_old_ClassDeclaration_LocalOrdererManager());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalOrdererManager": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_LocalOrdererManager():
    TypeOnly<current.LocalOrdererManager>;
declare function use_old_ClassDeclaration_LocalOrdererManager(
    use: TypeOnly<old.LocalOrdererManager>);
use_old_ClassDeclaration_LocalOrdererManager(
    get_current_ClassDeclaration_LocalOrdererManager());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalWebSocket": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_LocalWebSocket():
    TypeOnly<old.LocalWebSocket>;
declare function use_current_ClassDeclaration_LocalWebSocket(
    use: TypeOnly<current.LocalWebSocket>);
use_current_ClassDeclaration_LocalWebSocket(
    get_old_ClassDeclaration_LocalWebSocket());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalWebSocket": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_LocalWebSocket():
    TypeOnly<current.LocalWebSocket>;
declare function use_old_ClassDeclaration_LocalWebSocket(
    use: TypeOnly<old.LocalWebSocket>);
use_old_ClassDeclaration_LocalWebSocket(
    get_current_ClassDeclaration_LocalWebSocket());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalWebSocketServer": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_LocalWebSocketServer():
    TypeOnly<old.LocalWebSocketServer>;
declare function use_current_ClassDeclaration_LocalWebSocketServer(
    use: TypeOnly<current.LocalWebSocketServer>);
use_current_ClassDeclaration_LocalWebSocketServer(
    get_old_ClassDeclaration_LocalWebSocketServer());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_LocalWebSocketServer": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_LocalWebSocketServer():
    TypeOnly<current.LocalWebSocketServer>;
declare function use_old_ClassDeclaration_LocalWebSocketServer(
    use: TypeOnly<old.LocalWebSocketServer>);
use_old_ClassDeclaration_LocalWebSocketServer(
    get_current_ClassDeclaration_LocalWebSocketServer());