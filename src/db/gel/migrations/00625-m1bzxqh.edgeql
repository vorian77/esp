CREATE MIGRATION m1bzxqhod2kijsaeqirteq747vjqh2t3xjvgdjmblko7hfbm7xqxjq
    ONTO m1pb2azq6mawx6kuvfvzmmewubnjybqg36hivwsuahbyio6l4drlzq
{
              DROP FUNCTION sys_core::getSystem(nameOwnerAndSystem: std::str);
  CREATE FUNCTION sys_core::getSystem(nameOwner: std::str, nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = nameOwner) AND (.name = nameOwner))
      ))
  );
};
