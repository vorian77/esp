CREATE MIGRATION m1gwc5lx65ama5q3apa5bavpj354rfmjqgwufzpsoqkfalbmqvwecq
    ONTO m1k2xo766kiq23l5hafzgkm6zqkmn3zcmmusgp43m5k7vgkfc2j5qq
{
  DROP FUNCTION sys_core::getObj(name: std::str);
  CREATE FUNCTION sys_core::getObj(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObj USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObj
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
};
