CREATE MIGRATION m1n6v35tyneb545esgw3hkuezarqfhsmlrysob7ce3266rairywbfq
    ONTO m1vhvh364ju4ki74o7dauijqc5qxiqj7namvsgzydlhpjjatuaff3a
{
                  ALTER TYPE sys_core::SysDataObjAction {
      CREATE LINK codeActionConfirmType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjAction {
      DROP PROPERTY confirmBeforeChange;
  };
};
