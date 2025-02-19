/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluidframework/tool-utils-previous";
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
* "InterfaceDeclaration_IAsyncCache": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IAsyncCache():
    TypeOnly<old.IAsyncCache<any,any>>;
declare function use_current_InterfaceDeclaration_IAsyncCache(
    use: TypeOnly<current.IAsyncCache<any,any>>);
use_current_InterfaceDeclaration_IAsyncCache(
    get_old_InterfaceDeclaration_IAsyncCache());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IAsyncCache": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IAsyncCache():
    TypeOnly<current.IAsyncCache<any,any>>;
declare function use_old_InterfaceDeclaration_IAsyncCache(
    use: TypeOnly<old.IAsyncCache<any,any>>);
use_old_InterfaceDeclaration_IAsyncCache(
    get_current_InterfaceDeclaration_IAsyncCache());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IOdspTokenManagerCacheKey": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IOdspTokenManagerCacheKey():
    TypeOnly<old.IOdspTokenManagerCacheKey>;
declare function use_current_InterfaceDeclaration_IOdspTokenManagerCacheKey(
    use: TypeOnly<current.IOdspTokenManagerCacheKey>);
use_current_InterfaceDeclaration_IOdspTokenManagerCacheKey(
    get_old_InterfaceDeclaration_IOdspTokenManagerCacheKey());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IOdspTokenManagerCacheKey": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IOdspTokenManagerCacheKey():
    TypeOnly<current.IOdspTokenManagerCacheKey>;
declare function use_old_InterfaceDeclaration_IOdspTokenManagerCacheKey(
    use: TypeOnly<old.IOdspTokenManagerCacheKey>);
use_old_InterfaceDeclaration_IOdspTokenManagerCacheKey(
    get_current_InterfaceDeclaration_IOdspTokenManagerCacheKey());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IResources": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IResources():
    TypeOnly<old.IResources>;
declare function use_current_InterfaceDeclaration_IResources(
    use: TypeOnly<current.IResources>);
use_current_InterfaceDeclaration_IResources(
    get_old_InterfaceDeclaration_IResources());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IResources": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IResources():
    TypeOnly<current.IResources>;
declare function use_old_InterfaceDeclaration_IResources(
    use: TypeOnly<old.IResources>);
use_old_InterfaceDeclaration_IResources(
    get_current_InterfaceDeclaration_IResources());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ISnapshotNormalizerConfig": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ISnapshotNormalizerConfig():
    TypeOnly<old.ISnapshotNormalizerConfig>;
declare function use_current_InterfaceDeclaration_ISnapshotNormalizerConfig(
    use: TypeOnly<current.ISnapshotNormalizerConfig>);
use_current_InterfaceDeclaration_ISnapshotNormalizerConfig(
    get_old_InterfaceDeclaration_ISnapshotNormalizerConfig());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ISnapshotNormalizerConfig": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ISnapshotNormalizerConfig():
    TypeOnly<current.ISnapshotNormalizerConfig>;
declare function use_old_InterfaceDeclaration_ISnapshotNormalizerConfig(
    use: TypeOnly<old.ISnapshotNormalizerConfig>);
use_old_InterfaceDeclaration_ISnapshotNormalizerConfig(
    get_current_InterfaceDeclaration_ISnapshotNormalizerConfig());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_OdspTokenConfig": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_OdspTokenConfig():
    TypeOnly<old.OdspTokenConfig>;
declare function use_current_TypeAliasDeclaration_OdspTokenConfig(
    use: TypeOnly<current.OdspTokenConfig>);
use_current_TypeAliasDeclaration_OdspTokenConfig(
    get_old_TypeAliasDeclaration_OdspTokenConfig());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_OdspTokenConfig": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_OdspTokenConfig():
    TypeOnly<current.OdspTokenConfig>;
declare function use_old_TypeAliasDeclaration_OdspTokenConfig(
    use: TypeOnly<old.OdspTokenConfig>);
use_old_TypeAliasDeclaration_OdspTokenConfig(
    get_current_TypeAliasDeclaration_OdspTokenConfig());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OdspTokenManager": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_OdspTokenManager():
    TypeOnly<old.OdspTokenManager>;
declare function use_current_ClassDeclaration_OdspTokenManager(
    use: TypeOnly<current.OdspTokenManager>);
use_current_ClassDeclaration_OdspTokenManager(
    get_old_ClassDeclaration_OdspTokenManager());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OdspTokenManager": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_OdspTokenManager():
    TypeOnly<current.OdspTokenManager>;
declare function use_old_ClassDeclaration_OdspTokenManager(
    use: TypeOnly<old.OdspTokenManager>);
use_old_ClassDeclaration_OdspTokenManager(
    get_current_ClassDeclaration_OdspTokenManager());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_gcBlobPrefix": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_gcBlobPrefix():
    TypeOnly<typeof old.gcBlobPrefix>;
declare function use_current_VariableDeclaration_gcBlobPrefix(
    use: TypeOnly<typeof current.gcBlobPrefix>);
use_current_VariableDeclaration_gcBlobPrefix(
    get_old_VariableDeclaration_gcBlobPrefix());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_gcBlobPrefix": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_gcBlobPrefix():
    TypeOnly<typeof current.gcBlobPrefix>;
declare function use_old_VariableDeclaration_gcBlobPrefix(
    use: TypeOnly<typeof old.gcBlobPrefix>);
use_old_VariableDeclaration_gcBlobPrefix(
    get_current_VariableDeclaration_gcBlobPrefix());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getMicrosoftConfiguration": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_getMicrosoftConfiguration():
    TypeOnly<typeof old.getMicrosoftConfiguration>;
declare function use_current_VariableDeclaration_getMicrosoftConfiguration(
    use: TypeOnly<typeof current.getMicrosoftConfiguration>);
use_current_VariableDeclaration_getMicrosoftConfiguration(
    get_old_VariableDeclaration_getMicrosoftConfiguration());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getMicrosoftConfiguration": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_getMicrosoftConfiguration():
    TypeOnly<typeof current.getMicrosoftConfiguration>;
declare function use_old_VariableDeclaration_getMicrosoftConfiguration(
    use: TypeOnly<typeof old.getMicrosoftConfiguration>);
use_old_VariableDeclaration_getMicrosoftConfiguration(
    get_current_VariableDeclaration_getMicrosoftConfiguration());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getNormalizedSnapshot": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_getNormalizedSnapshot():
    TypeOnly<typeof old.getNormalizedSnapshot>;
declare function use_current_FunctionDeclaration_getNormalizedSnapshot(
    use: TypeOnly<typeof current.getNormalizedSnapshot>);
use_current_FunctionDeclaration_getNormalizedSnapshot(
    get_old_FunctionDeclaration_getNormalizedSnapshot());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getNormalizedSnapshot": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_getNormalizedSnapshot():
    TypeOnly<typeof current.getNormalizedSnapshot>;
declare function use_old_FunctionDeclaration_getNormalizedSnapshot(
    use: TypeOnly<typeof old.getNormalizedSnapshot>);
use_old_FunctionDeclaration_getNormalizedSnapshot(
    get_current_FunctionDeclaration_getNormalizedSnapshot());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_loadRC": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_loadRC():
    TypeOnly<typeof old.loadRC>;
declare function use_current_FunctionDeclaration_loadRC(
    use: TypeOnly<typeof current.loadRC>);
use_current_FunctionDeclaration_loadRC(
    get_old_FunctionDeclaration_loadRC());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_loadRC": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_loadRC():
    TypeOnly<typeof current.loadRC>;
declare function use_old_FunctionDeclaration_loadRC(
    use: TypeOnly<typeof old.loadRC>);
use_old_FunctionDeclaration_loadRC(
    get_current_FunctionDeclaration_loadRC());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_lockRC": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_lockRC():
    TypeOnly<typeof old.lockRC>;
declare function use_current_FunctionDeclaration_lockRC(
    use: TypeOnly<typeof current.lockRC>);
use_current_FunctionDeclaration_lockRC(
    get_old_FunctionDeclaration_lockRC());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_lockRC": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_lockRC():
    TypeOnly<typeof current.lockRC>;
declare function use_old_FunctionDeclaration_lockRC(
    use: TypeOnly<typeof old.lockRC>);
use_old_FunctionDeclaration_lockRC(
    get_current_FunctionDeclaration_lockRC());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_odspTokensCache": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_odspTokensCache():
    TypeOnly<typeof old.odspTokensCache>;
declare function use_current_VariableDeclaration_odspTokensCache(
    use: TypeOnly<typeof current.odspTokensCache>);
use_current_VariableDeclaration_odspTokensCache(
    get_old_VariableDeclaration_odspTokensCache());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_odspTokensCache": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_odspTokensCache():
    TypeOnly<typeof current.odspTokensCache>;
declare function use_old_VariableDeclaration_odspTokensCache(
    use: TypeOnly<typeof old.odspTokensCache>);
use_old_VariableDeclaration_odspTokensCache(
    get_current_VariableDeclaration_odspTokensCache());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_saveRC": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_saveRC():
    TypeOnly<typeof old.saveRC>;
declare function use_current_FunctionDeclaration_saveRC(
    use: TypeOnly<typeof current.saveRC>);
use_current_FunctionDeclaration_saveRC(
    get_old_FunctionDeclaration_saveRC());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_saveRC": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_saveRC():
    TypeOnly<typeof current.saveRC>;
declare function use_old_FunctionDeclaration_saveRC(
    use: TypeOnly<typeof old.saveRC>);
use_old_FunctionDeclaration_saveRC(
    get_current_FunctionDeclaration_saveRC());
