CREATE MIGRATION m1aiosoolc3e3pu2nyzfumo3r66ricfx65yowd4ocayfhseawwqr6q
    ONTO m1gwc5lx65ama5q3apa5bavpj354rfmjqgwufzpsoqkfalbmqvwecq
{
  CREATE FUNCTION sys_core::getObjEnt(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjEnt USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjEnt
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
};
