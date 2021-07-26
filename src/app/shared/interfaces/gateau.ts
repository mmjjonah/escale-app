import {ParamGen} from './param-gen';

export interface Gateau {
  gateau_id: number
  gateau_nb_pax: number,
  gateau_form_param_fk: string | number,
  gateau_type_param_fk:  string | number,
  gateau_decoration: string,
  gateau_model?: File,
  gateau_message: string,
  gateau_arome_special?: string,
  gateau_piece_montee?: number,
  gateau_layercake?: number,
  gateau_dripcake?: number,
  gateau_observation: string,
  gateau_montant_unitaire: number,
  gateau_montant_total: number,
  forme: ParamGen,
  type: ParamGen
}
