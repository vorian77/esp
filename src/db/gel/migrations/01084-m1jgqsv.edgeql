CREATE MIGRATION m1jgqsv3hfqyrudm2tyuqy2qy3fkv5su335kpmzczpvoleenj7dryq
    ONTO m1coro2ruvzwtj22z6p5mi4icj77ioqly4kcfyakxrqbhwx4vb3vdq
{
  DROP FUNCTION sys_core::getAttr(ownerName: std::str, name: std::str);
  CREATE FUNCTION sys_core::getAttrObj(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysAttrObj USING (SELECT
      std::assert_single((SELECT
          sys_core::SysAttrObj
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
};
