CREATE MIGRATION m1jswlryvgmrjipbec6p66lkrakxaxfzqlndeya2auetsiqto7g7ia
    ONTO m1n6v35tyneb545esgw3hkuezarqfhsmlrysob7ce3266rairywbfq
{
                  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK codeNavType: sys_core::SysCode;
  };
};
