import {Client} from './client';
import {Gateau} from './gateau';

export interface Command {
  command_id: number,
  command_date_livraison: string,
  command_lieu_livraison?: string,
  command_evenement: string,
  command_montant_a_compte: number,
  command_retour_client: string,
  client: Client,
  gateaux: Gateau[]
}
