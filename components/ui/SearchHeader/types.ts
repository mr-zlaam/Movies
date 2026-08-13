export interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  autoFocus?: boolean;
}
