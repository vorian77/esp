CREATE MIGRATION m1ake3uj7iq6hxfsuxyztvlyvisxomdchsbu5vrorjnreoy5rjvueq
    ONTO m12pn6x4sucz2qxsm6xcoxyzin3n2xqxfvhqam2fthawq5h7fhw3aa
{
  CREATE FUNCTION sys_core::getEligibilityNode(id: std::str) -> OPTIONAL sys_core::SysEligibilityNode USING (SELECT
      std::assert_single((SELECT
          sys_core::SysEligibilityNode
      FILTER
          (.id = <std::uuid>id)
      ))
  );
};
