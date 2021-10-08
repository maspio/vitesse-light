import { SelectItem } from '~/types'

const zhb = {
  facets: [
    { identifier: 'department', label: 'Fachbereich', entries: [{ id: 'architektur', label: 'Architektur' }, { id: 'belletristik-deutsch', label: 'Belletristik deutsch' }, { id: 'belletristik-fremdsprachlich', label: 'Belletristik fremdsprachlich' }, { id: 'betriebswirtschaftslehre', label: 'Betriebswirtschaftslehre' }, { id: 'ethnologie', label: 'Ethnologie' }, { id: 'geschichte', label: 'Geschichte' }, { id: 'health-sciences', label: 'Health Sciences' }, { id: 'informatik', label: 'Informatik' }, { id: 'information-medien-kommunikation', label: 'Information, Medien, Kommunikation' }, { id: 'islamische-theologie', label: 'Islamische Theologie' }, { id: 'judaistik', label: 'Judaistik' }, { id: 'kulturwissenschaft', label: 'Kulturwissenschaft' }, { id: 'kunst', label: 'Kunst' }, { id: 'medizin', label: 'Medizin' }, { id: 'naturwissenschaften-und-mathematik', label: 'Naturwissenschaften und Mathematik' }, { id: 'paedagogik', label: 'Pädagogik' }, { id: 'philosophie', label: 'Philosophie' }, { id: 'politologie', label: 'Politologie' }, { id: 'psychologie', label: 'Psychologie' }, { id: 'rechtswissenschaft', label: 'Rechtswissenschaft' }, { id: 'reisefuehrer', label: 'Reiseführer' }, { id: 'religionswissenschaft', label: 'Religionswissenschaft' }, { id: 'soziologie', label: 'Soziologie' }, { id: 'sport', label: 'Sport' }, { id: 'sprache-und-literatur', label: 'Sprache und Literatur' }, { id: 'technik', label: 'Technik' }, { id: 'theologie', label: 'Theologie' }, { id: 'volkswirtschaftslehre', label: 'Volkswirtschaftslehre' }, { id: 'wissenschaftsforschung', label: 'Wissenschaftsforschung' }] }],
}

const toSelectItem = () =>
  zhb.facets[0].entries.map(f => ({
    text: f.label,
    value: f.id,
  })) as SelectItem[]

export const Facets = {
  toSelectItem,
  zhb,
}
