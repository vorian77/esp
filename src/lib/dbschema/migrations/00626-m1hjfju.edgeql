CREATE MIGRATION m1hjfjuqeoprkwabfj3tlwsnrahbthgkcbkxkmh2tw46uth2nij6sq
    ONTO m1bzxqhod2kijsaeqirteq747vjqh2t3xjvgdjmblko7hfbm7xqxjq
{
  CREATE FUNCTION sys_core::getSystemPrime(nameOwnerAndSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      sys_core::getSystem(nameOwnerAndSystem, nameOwnerAndSystem)
  );
};
