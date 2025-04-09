CREATE MIGRATION m1clzmu6x5qnn4a27uh3weo6oxjlb2t4exd6qdl66mc6cjywiytiya
    ONTO m1elao3oz2ljqdr7knjdzv3fgoq4hkutz2zvux7iji7e3yd3f6z5uq
{
  CREATE FUNCTION sys_core::getAttr(ownerName: std::str, name: std::str, codeAttrType: std::str) -> OPTIONAL sys_core::SysAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysAttr
      FILTER
          (((.obj.owner.name = ownerName) AND (.obj.name = name)) AND (.codeAttrType.name = codeAttrType))
      ))
  );
};
