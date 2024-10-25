CREATE MIGRATION m14fvnp2w43jvs5p6u7uegoyuauviafg34nnyh3xo4erwvaat4grtq
    ONTO m1fhihksmggil3r54xq5hr46onxfxavonktngr3ogbio64lnod5i3a
{
  CREATE MODULE org_moed IF NOT EXISTS;
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY avatar: std::json;
      CREATE PROPERTY email: std::str;
  };
  ALTER TYPE default::SysPerson {
      CREATE LINK codeDisabilityStatus: sys_core::SysCode;
      CREATE PROPERTY ssn: std::str;
  };
  CREATE TYPE org_moed::MoedPerson EXTENDING sys_core::SysObj {
      CREATE LINK codeDisabilityStatus: sys_core::SysCode;
      CREATE LINK codeEthnicity: sys_core::SysCode;
      CREATE LINK codeGender: sys_core::SysCode;
      CREATE LINK codeRace: sys_core::SysCode;
      CREATE LINK office: sys_core::SysObj;
      CREATE PROPERTY birthDate: cal::local_date;
      CREATE PROPERTY consentDisclaimer: std::bool;
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
      CREATE PROPERTY middleName: default::Name;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY ssn: std::str;
  };
};
