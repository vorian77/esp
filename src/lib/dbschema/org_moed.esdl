module org_moed {
  type MoedParticipant extending app_cm::CmClient {    
    consentDisclaimer: bool;
    office: sys_core::SysObj;
    ssn: str;
  }

  type MoedPartData extending sys_core::SysObj {
    required participant: org_moed::MoedParticipant;
  }

  # type MoedPartDoc extending org_moed::MoedPartData {
  #   required codeType: sys_core::SysCode;
  #   required date: cal::local_date;
  #   file: json;
  # }

  # type MoedPartNote extending org_moed::MoedPartData {
  #   required date: cal::local_date;
  #   required codeType: sys_core::SysCode;
  # }
}