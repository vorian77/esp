module default {
  scalar type Name extending str;

  type SysError {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };
    errFile: str;
    errFunction: str;
    errMsg: str;
    required user: sys_user::SysUser{
      on source delete delete target if orphan;
    };
  }

  type SysPerson {
    addr1: str;
    addr2: str;
    avatar: json;
    birthDate: cal::local_date;
    city: str;
    codeDisabilityStatus: sys_core::SysCode;
    codeEthnicity: sys_core::SysCode;
    codeGender: sys_core::SysCode;
    codeRace: sys_core::SysCode;
    codeState: sys_core::SysCode;
    email: str;
    favFood: str;
    required firstName: default::Name;
    property fullName := .firstName ++ ' ' ++ .lastName;
    idMigration: uuid;
    required lastName: default::Name;
    middleName: default::Name;
    note: str;
    phoneAlt: str;
    phoneMobile: str;
    ssn: str;
    title: str;
    zip: str;
  }
  
  scalar type nonNegative extending int64 {
    constraint min_value(0);
  }

  type Person {
    required name: str { constraint exclusive };
  }

  type Movie {
    required title: str { constraint exclusive };
    character: Person;
  }

  # FUNCTIONS
  function average(values: array<float64>) -> float64
     using (select (IF len(values) = 0 THEN 0 ELSE rate(sum(array_unpack(values)), len(values))));

  function rate(num: float64, denom: float64) -> float64
    using (select (IF denom = 0 THEN 0 ELSE round(num / denom * 100) / 100));
}
