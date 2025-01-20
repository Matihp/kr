export const formatDate = (date: Date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000 / 60
    );
  
    if (diffInMinutes < 1) return "Ahora mismo";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} horas`;
    }
    return notificationDate.toLocaleDateString();
  };