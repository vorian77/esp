CREATE MIGRATION m1usvoiuxuw7ykurgeedwl26zqijn5pbpn55qvo7mrplvdrebwdx6q
    ONTO m1nax25j4xtss63qe2rqplvub5wftpso3o5qpgzkwokn4rxojiygsq
{
              ALTER TYPE sys_core::SysNodeObj {
      CREATE PROPERTY isSystemRoot: std::bool;
  };
};
