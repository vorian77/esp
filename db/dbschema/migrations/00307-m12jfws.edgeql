CREATE MIGRATION m12jfwskmonyhiqlvlp2tk7rojyvutsde6qvzav5mybkg7kcvzjqha
    ONTO m1mpcelxxctwnuu2lk33rhaceyhbnszdebjvdehszlrhifdlamd6kq
{
  CREATE TYPE default::SysPersonTest EXTENDING sys_core::SysObj {
      CREATE LINK codeEthnicity: sys_core::SysCode;
      CREATE LINK codeGender: sys_core::SysCode;
      CREATE LINK codeRace: sys_core::SysCode;
      CREATE LINK codeState: sys_core::SysCode;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY avatar: std::json;
      CREATE PROPERTY birthDate: cal::local_date;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY favFood: std::str;
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
      CREATE PROPERTY middleName: default::Name;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY phoneAlt: std::str;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY zip: std::str;
  };
};
