CREATE MIGRATION m1rpqo6namhpdexccleia33npr5dexivgjq4aogaj7y5jhtsh5oe7q
    ONTO m1vmbnurtd3zhyo52e5hvnmflodgliexrljryrwbj3phwsynkrkuha
{
  ALTER TYPE sys_core::SysDataObjStyle {
      DROP LINK column;
  };
};
