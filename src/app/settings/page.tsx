"use client";
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

interface SettingsPageProps {}

const Settings: React.FC<SettingsPageProps> = () => {
  const [firstName, setFirstName] = useState<string>('John');
  const [lastName, setLastName] = useState<string>('Doe');
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
  const [timezone, setTimezone] = useState<{ value: string; label: string } | null>(null);
  const [email, setEmail] = useState<string>('user@example.com');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPasswordConfirmAlert, setShowPasswordConfirmAlert] = useState<boolean>(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value);
  const toggleNotifications = () => setNotifications((prev) => !prev);
  const toggleTheme = () => setTheme((prev) => prev === 'light' ? 'dark' : 'light');

  const handleSavePersonalInfo = () => {
    // Lógica para guardar cambios de información personal
    console.log('Información personal guardada:', { firstName, lastName, country, timezone });
  };

  const handleSavePassword = () => {
    if (newPassword.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    setShowPasswordConfirmAlert(true);
  };

  const handleConfirmPasswordChange = (confirm: boolean) => {
    if (confirm) {
      // Lógica para guardar cambios de contraseña
      console.log('Contraseña actualizada:', { password: newPassword });
    }
    setShowPasswordConfirmAlert(false);
  };

  return (
    <div className={`bg-gray-100 min-h-screen py-12 md:pt-24 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 dark:text-gray-200">Configuración</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-gray-800 dark:text-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium">
              Información personal
            </h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apellido
                </label>
                <div className="mt-1">
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  País
                </label>
                <div className="mt-1">
                  
                </div>
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Zona horaria
                </label>
                <div className="mt-1">

                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
          <Button onClick={handleSavePersonalInfo}>
            Guardar información
          </Button>
        </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8 dark:bg-gray-800 dark:text-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium">
              Cambiar contraseña
            </h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña actual
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nueva contraseña
                </label>
                <div className="mt-1">
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirmar nueva contraseña
                </label>
                <div className="mt-1">
                  <Input
                    id="confirm-new-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    className="block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleSavePassword}>
                Guardar contraseña
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8 dark:bg-gray-800 dark:text-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium">
              Notificaciones
            </h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Recibir notificaciones
              </span>
              <Switch
                checked={notifications}
                onChange={toggleNotifications}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8 dark:bg-gray-800 dark:text-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium">
              Apariencia
            </h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modo oscuro
              </span>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </div>
          </div>
        </div>

        {showPasswordConfirmAlert && (
          <Alert variant="default" className="mt-8">
            <AlertTitle>¿Estás seguro de cambiar la contraseña?</AlertTitle>
            <AlertDescription>
              <div className="flex justify-end mt-4">
                <Button variant="secondary" onClick={() => handleConfirmPasswordChange(false)}>
                  No
                </Button>
                <Button className="ml-4" onClick={() => handleConfirmPasswordChange(true)}>
                  Sí
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};


export default Settings;