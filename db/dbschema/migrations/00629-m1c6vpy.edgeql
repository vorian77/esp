CREATE MIGRATION m1c6vpyob5g3cutsvjjnrwtrsf4hjus3uz2qajnwaqqhsjul7g3bda
    ONTO m1kddlvd5oev5y2iqk2yd5rzu7dsj2plsgldkawrzn2tch76flzakq
{
  CREATE FUNCTION sys_core::getSystemPrime(nameSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          (.name = nameSystem)
      ))
  );
};
