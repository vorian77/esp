CREATE MIGRATION m1psrjqp4wfic5wxkthwo5sjcj5j77uo4pnhqxoaix6mforftqgnla
    ONTO m1h3fqvrhmxzgvqwgp2fja4a5xn3qquzz6sces2s2vxtin43f6x63q
{
              CREATE FUNCTION sys_core::getSystem(ownerName: std::str, sysName: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = ownerName) AND (.name = sysName))
      ))
  );
};
