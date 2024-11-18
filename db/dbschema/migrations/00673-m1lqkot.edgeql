CREATE MIGRATION m1lqkotxvolzc5qqa6u5qwfns5uhokcibe7x2jvgkxoqck3jnrvaea
    ONTO m1oh4b4hmgypo3txib2wvlhfbqmeqmrprparo472dvtsruwlujitla
{
  CREATE FUNCTION sys_core::getObj(name: std::str) -> OPTIONAL sys_core::SysObj USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObj
      FILTER
          (.name = name)
      ))
  );
};
