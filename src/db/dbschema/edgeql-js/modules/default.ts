// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _sys_user from "./sys_user";
import type * as _sys_core from "./sys_core";
import type * as _cal from "./cal";
import type * as _app_cm from "./app_cm";
import type * as _sys_rep from "./sys_rep";
import type * as _sys_db from "./sys_db";
import type * as _sys_migr from "./sys_migr";
import type * as _org_moed from "./org_moed";
export type $Name = $.ScalarType<"std::str", string>;
const Name: $.scalarTypeWithConstructor<_std.$str, never> = $.makeType<$.scalarTypeWithConstructor<_std.$str, never>>(_.spec, "5061cd07-b3c2-11ee-b459-95308b4e5073", _.syntax.literal);

export type $nonNegative = $.ScalarType<"std::number", number>;
const nonNegative: $.scalarTypeWithConstructor<_std.$number, string> = $.makeType<$.scalarTypeWithConstructor<_std.$number, string>>(_.spec, "50312c72-b3c2-11ee-8e6a-23f218a1f329", _.syntax.literal);

export type $MovieλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "character": $.LinkDesc<$Person, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
}>;
type $Movie = $.ObjectType<"default::Movie", $MovieλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {title: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Movie = $.makeType<$Movie>(_.spec, "0a03c423-fbfc-11ee-97c7-bbbf283c38a8", _.syntax.literal);

const Movie: $.$expr_PathNode<$.TypeSet<$Movie, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Movie, $.Cardinality.Many), null);

export type $PersonλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "<character[is Movie]": $.LinkDesc<$Movie, $.Cardinality.Many, {}, false, false,  false, false>;
  "<character": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Person = $.ObjectType<"default::Person", $PersonλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Person = $.makeType<$Person>(_.spec, "0a020ae9-fbfc-11ee-87a7-9b61aa1fc993", _.syntax.literal);

const Person: $.$expr_PathNode<$.TypeSet<$Person, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Person, $.Cardinality.Many), null);

export type $SysErrorλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<_sys_user.$SysUser, $.Cardinality.One, {}, false, false,  false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, true, true>;
  "errFile": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "errFunction": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "errMsg": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $SysError = $.ObjectType<"default::SysError", $SysErrorλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $SysError = $.makeType<$SysError>(_.spec, "edb1625b-6d5c-11ef-9d20-0b4826d9aa54", _.syntax.literal);

const SysError: $.$expr_PathNode<$.TypeSet<$SysError, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SysError, $.Cardinality.Many), null);

export type $SysPersonλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "firstName": $.PropertyDesc<$Name, $.Cardinality.One, false, false, false, false>;
  "lastName": $.PropertyDesc<$Name, $.Cardinality.One, false, false, false, false>;
  "codeEthnicity": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeGender": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeRace": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeState": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "addr1": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "addr2": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "birthDate": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "city": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "favFood": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "fullName": $.PropertyDesc<_std.$str, $.Cardinality.One, false, true, false, false>;
  "idMigration": $.PropertyDesc<_std.$uuid, $.Cardinality.AtMostOne, false, false, false, false>;
  "middleName": $.PropertyDesc<$Name, $.Cardinality.AtMostOne, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "phoneAlt": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "phoneMobile": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "zip": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "avatar": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeDisabilityStatus": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "ssn": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<person[is app_cm::CmClient]": $.LinkDesc<_app_cm.$CmClient, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::SysUser]": $.LinkDesc<_sys_user.$SysUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::currentUser]": $.LinkDesc<_sys_user.$currentUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::ObjRoot]": $.LinkDesc<_sys_core.$ObjRoot, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysSystem]": $.LinkDesc<_sys_core.$SysSystem, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysObj]": $.LinkDesc<_sys_core.$SysObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjFieldEmbedListSelect]": $.LinkDesc<_sys_core.$SysDataObjFieldEmbedListSelect, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is app_cm::CmServiceFlow]": $.LinkDesc<_app_cm.$CmServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is app_cm::CmPartner]": $.LinkDesc<_app_cm.$CmPartner, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_rep::SysRep]": $.LinkDesc<_sys_rep.$SysRep, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_db::SysColumn]": $.LinkDesc<_sys_db.$SysColumn, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjActionFieldGroup]": $.LinkDesc<_sys_core.$SysDataObjActionFieldGroup, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is app_cm::CmCohort]": $.LinkDesc<_app_cm.$CmCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_user::SysUserType]": $.LinkDesc<_sys_user.$SysUserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysNodeObj]": $.LinkDesc<_sys_core.$SysNodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_migr::SysMigr]": $.LinkDesc<_sys_migr.$SysMigr, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_user::SysWidget]": $.LinkDesc<_sys_user.$SysWidget, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjFieldListItems]": $.LinkDesc<_sys_core.$SysDataObjFieldListItems, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObj]": $.LinkDesc<_sys_core.$SysDataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_db::SysTable]": $.LinkDesc<_sys_db.$SysTable, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjActionField]": $.LinkDesc<_sys_core.$SysDataObjActionField, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysCodeType]": $.LinkDesc<_sys_core.$SysCodeType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjFieldEmbedListEdit]": $.LinkDesc<_sys_core.$SysDataObjFieldEmbedListEdit, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_rep::SysAnalytic]": $.LinkDesc<_sys_rep.$SysAnalytic, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is app_cm::CmCourse]": $.LinkDesc<_app_cm.$CmCourse, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysDataObjFieldEmbedListConfig]": $.LinkDesc<_sys_core.$SysDataObjFieldEmbedListConfig, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysOrg]": $.LinkDesc<_sys_core.$SysOrg, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysAppHeader]": $.LinkDesc<_sys_core.$SysAppHeader, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysObjSubject]": $.LinkDesc<_sys_core.$SysObjSubject, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysCode]": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is org_moed::MoedPartData]": $.LinkDesc<_org_moed.$MoedPartData, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is org_moed::MoedParticipant]": $.LinkDesc<_org_moed.$MoedParticipant, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts[is sys_core::SysApp]": $.LinkDesc<_sys_core.$SysApp, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contacts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $SysPerson = $.ObjectType<"default::SysPerson", $SysPersonλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $SysPerson = $.makeType<$SysPerson>(_.spec, "5061da6e-b3c2-11ee-bf41-01b5a8f3a48e", _.syntax.literal);

const SysPerson: $.$expr_PathNode<$.TypeSet<$SysPerson, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SysPerson, $.Cardinality.Many), null);



export { Name, nonNegative, $Movie, Movie, $Person, Person, $SysError, SysError, $SysPerson, SysPerson };

type __defaultExports = {
  "Name": typeof Name;
  "nonNegative": typeof nonNegative;
  "Movie": typeof Movie;
  "Person": typeof Person;
  "SysError": typeof SysError;
  "SysPerson": typeof SysPerson
};
const __defaultExports: __defaultExports = {
  "Name": Name,
  "nonNegative": nonNegative,
  "Movie": Movie,
  "Person": Person,
  "SysError": SysError,
  "SysPerson": SysPerson
};
export default __defaultExports;