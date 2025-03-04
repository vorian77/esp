CREATE MIGRATION m1joni75ykkjmlccocxdd3zr7ocrx6fl4f73qhmddhd2kf5anxw3iq
    ONTO m1465wizxlf4yup66kwqaxsjht623fbrm5i4jemiz7gl6e3dbgsm3q
{
  DROP FUNCTION sys_core::getObjEnt(ownerName: std::str, name: std::str);
  CREATE FUNCTION sys_core::getObjEntAttr(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjEntAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjEntAttr
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
};
