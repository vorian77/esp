CREATE MIGRATION m1td4zttnx6tf54h72enlbmnuq7q2ctnpn36b5qp3m4ub54tgwnizq
    ONTO m14jloqznahcszyvfkt2ph6i3s46tqavvz5lvq25wzatraymh2ch7q
{
                  ALTER TYPE sys_core::SysDataObjAction {
      CREATE PROPERTY confirmButtonLabelCancel: std::str;
      CREATE PROPERTY confirmButtonLabelConfirm: std::str;
      CREATE PROPERTY confirmMessage: std::str;
      CREATE PROPERTY confirmTitle: std::str;
  };
};
